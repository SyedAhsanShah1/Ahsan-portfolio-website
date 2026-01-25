from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("API Key not found!")
else:
    print(f"API Key found: {api_key[:5]}...")
    try:
        client = genai.Client(api_key=api_key)
        
        target_model = 'gemini-2.0-flash-lite'
        print(f"Testing model: {target_model}")
        
        response = client.models.generate_content(
            model=target_model, contents="Hello"
        )
        print("Success! Response:")
        print(response.text)
    except Exception as e:
        print(f"Error: {e}")
