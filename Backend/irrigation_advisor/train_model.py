import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

def train_model():
    df = pd.read_csv('irrigation_data.csv')
    print(f"✅ Loaded {len(df)} samples")
    
    X = df[['moisture', 'humidity', 'temp', 'et']]
    y = df['irrigate']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    os.makedirs('model', exist_ok=True)
    joblib.dump(model, 'model/irrigation_model.joblib')
    
    accuracy = model.score(X_test, y_test)
    print(f"🎉 Training Complete! Accuracy: {accuracy:.1%}")
    
    with open('model_report.txt', 'w') as f:
        f.write(f"Smart Irrigation Model Report\nAccuracy: {accuracy:.1%}\nSamples: {len(df)}")

if __name__ == "__main__":
    train_model()