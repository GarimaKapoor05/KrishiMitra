import os
import numpy as np
import pandas as pd
import joblib

from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.callbacks import EarlyStopping

# ----------------------------
# Configuration
# ----------------------------
DATASET = "dataset.csv"
MODEL_DIR = "model"
MARKET = "Bhopal"

# Define your 5 crops here (make sure these names match your dataset.csv exactly)
CROPS_TO_TRAIN = ["Rice", "Wheat", "Maize", "Cotton", "Soybean"]

LOOK_BACK = 10
EPOCHS = 30
BATCH_SIZE = 32

def create_sequences(data, look_back):
    X, y = [], []
    for i in range(len(data) - look_back):
        X.append(data[i:i + look_back])
        y.append(data[i + look_back])
    return np.array(X), np.array(y)

def train_all_crops():
    os.makedirs(MODEL_DIR, exist_ok=True)
    
    # Load Dataset once
    if not os.path.exists(DATASET):
        print(f"❌ Error: Dataset file '{DATASET}' not found!")
        return
        
    base_df = pd.read_csv(DATASET)
    base_df["Date"] = pd.to_datetime(base_df["Date"])

    for crop_name in CROPS_TO_TRAIN:
        print(f"\n" + "="*50)
        print(f"🚀 Starting Training Pipeline for Crop: {crop_name}")
        print("="*50)
        
        # Filter by current crop and target market
        df = base_df[
            (base_df["Crop"].str.lower() == crop_name.lower()) &
            (base_df["Market"].str.lower() == MARKET.lower())
        ].copy()

        df = df.sort_values("Date")

        if len(df) < LOOK_BACK + 20:
            print(f"⚠️ Skipping {crop_name}: Not enough records found in dataset (Found {len(df)} rows).")
            continue

        prices = df["Price"].values.reshape(-1, 1)

        # Scale Data
        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_prices = scaler.fit_transform(prices)

        # Create Sequences
        X, y = create_sequences(scaled_prices, LOOK_BACK)
        X = X.reshape((X.shape[0], X.shape[1], 1))

        # Train-Test Split (80-20)
        split = int(len(X) * 0.8)
        X_train, X_test = X[:split], X[split:]
        y_train, y_test = y[:split], y[split:]

        # Build Model
        model = Sequential([
            LSTM(64, return_sequences=True, input_shape=(LOOK_BACK, 1)),
            LSTM(32),
            Dense(16, activation="relu"),
            Dense(1)
        ])

        model.compile(optimizer="adam", loss="mean_squared_error")

        early_stop = EarlyStopping(
            monitor="val_loss",
            patience=5,
            restore_best_weights=True
        )

        # Train Current Crop Model
        model.fit(
            X_train,
            y_train,
            validation_data=(X_test, y_test),
            epochs=EPOCHS,
            batch_size=BATCH_SIZE,
            callbacks=[early_stop],
            verbose=1
        )

        loss = model.evaluate(X_test, y_test, verbose=0)
        print(f"📊 {crop_name} Test Loss: {loss:.6f}")

        # Save dynamically using the loop item name
        model_filename = f"{crop_name.lower()}_{MARKET.lower()}_lstm.keras"
        scaler_filename = f"{crop_name.lower()}_{MARKET.lower()}_scaler.joblib"
        
        model.save(os.path.join(MODEL_DIR, model_filename))
        joblib.dump(scaler, os.path.join(MODEL_DIR, scaler_filename))

        print(f"✅ Successfully saved model files for {crop_name}!")

    print("\n🎉 All crop models have finished processing!")

if __name__ == "__main__":
    train_all_crops()