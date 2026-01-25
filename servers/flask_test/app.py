
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("GEMINI_API_KEY")
print(f"Loaded API Key: {API_KEY[:5]}...{API_KEY[-5:] if API_KEY else 'None'}")

if not API_KEY:
    print("❌ Error: GEMINI_API_KEY is missing in .env")

client = genai.Client(api_key=API_KEY)

# Try to use a model that definitely exists or fallback
MODEL_NAME = "gemini-2.0-flash-lite" 

@app.route('/', methods=['GET'])
def home():
    return jsonify({"status": "Server is running. Send POST requests to /chat"}) 

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get("message", "")
    
    if not message:
        return jsonify({"reply": "Please ask a question."})

    try:
        # Configuration for the model
        response = client.models.generate_content(
            model=MODEL_NAME, contents=message
        )
        
        return jsonify({"reply": response.text})
    except Exception as e:
        print(f"Error: {e}")
        # Build a helpful error message
        error_str = str(e)
        if "429" in error_str:
            return jsonify({"reply": "Too many requests (Rate Limit). Please wait 1 minute."}), 429
        return jsonify({"reply": f"Server Error: {error_str}"}), 500

if __name__ == '__main__':
    print(f"🚀 Flask Server running on http://localhost:5000")
    app.run(port=5000, debug=True)
