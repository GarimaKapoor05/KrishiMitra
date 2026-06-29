from flask import Flask, request, jsonify
from flask_cors import CORS

from predict_crop import predict_crop

app = Flask(__name__)
CORS(app)


@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    result = predict_crop(
        N=data["N"],
        P=data["P"],
        K=data["K"],
        temperature=data["temperature"],
        humidity=data["humidity"],
        ph=data["ph"],
        rainfall=data["rainfall"]
    )

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)