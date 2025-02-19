from flask import Flask, render_template, request, jsonify
import requests, os
from dotenv import load_dotenv
from module import *

load_dotenv()

app = Flask(__name__)

# OpenWeatherMap API Key (Replace this with your actual API key)
API_KEY = os.getenv("API")


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/check')
def check():
    result = start()
    return result

@app.route('/forecast', methods=['GET'])
def get_forecast():
    city = request.args.get('city')
    if city:
        # Use the OpenWeatherMap Forecast API
        url = f'https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric&lang=uk'
        response = requests.get(url)
        data = response.json()

        # Check if the city is valid
        if response.status_code != 200:
            return jsonify({'error': 'Місто не знайдено'}), 404

        # Return the forecast data to the frontend
        return jsonify(data)

    return jsonify({'error': 'Місто не зазначено'}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)
