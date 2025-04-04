from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import os

app = Flask(__name__)
CORS(app) # for react to communicate with flask

def enhanced_clean(text):
    # Remove URLs/special chars
    text = re.sub(r'http\S+|www\S+|https\S+|\|\|\|', ' ', text)
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    
    words = text.lower().split()
    
    stemmed = []
    for word in words:
        if word.endswith('ing'):
            word = word[:-3]
        elif word.endswith('ly'):
            word = word[:-2]
        elif word.endswith('s'):
            word = word[:-1]
        stemmed.append(word)
    
    return ' '.join(stemmed)

try:
    loaded_model = joblib.load('optimized_model.joblib')
    model = loaded_model['model']
    vectorizer = loaded_model['vectorizer']
    enhanced_cleaner = loaded_model['cleaner'] 
except FileNotFoundError:
    print('Error: optimized_model.joblib not found. Please ensure the model is available.') 
    exit(1)
except KeyError as e:
    print(f"Error: Missing key in .joblib file: {e}")
    exit(1)




@app.route('/api', methods=['POST'])
def handle_prompt():
    data = request.get_json()
    prompt = data.get('prompt', '')

    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    cleaned_text = enhanced_clean(prompt)
    text_features = vectorizer.transform([cleaned_text])

    predicted_label = model.predict(text_features)
    predicted_type = predicted_label[0]

    return jsonify({'response': predicted_type})


if __name__ == '__main__':
    app.run(debug=True, port=5000)

