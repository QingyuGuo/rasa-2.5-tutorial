import pathlib
import uuid
from pydantic import BaseModel
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
import requests as rq
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from google_trans_new import google_translator  
app = FastAPI()

# We want to be flexible in our localhost demo so we'll set
# very open CORS policies.
origins = [
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/static", StaticFiles(directory="../client/static", html=True), name="static")

class Text(BaseModel):
    text: str

class Translate(BaseModel):
    lang: str
    text: str


# This endpoint returns our HTML page.
@app.get("/", response_class=HTMLResponse)
def index():
    return HTMLResponse(content=pathlib.Path("../client/index.html").read_text(), status_code=200)


# This endpoint will receive texts, proxy to Rasa and return parsed results.
@app.post("/translate-to-english/")
async def translate_to_english(text: Text):
    translator = google_translator()
    payload = {
        "translated_text": translator.translate(text.text, lang_tgt='en')
    }
    return payload

@app.post("/translate-from-english/")
async def translate_from_english(req: Translate):
    translator = google_translator()

    print(translator.translate(req.text, lang_tgt=req.lang))
    payload = {
        "translated_text": translator.translate(req.text, lang_tgt=req.lang)
    }
    return payload

@app.post("/api/")
def post_attempt(text: Text):
    body = {
      "message": text.text,
      "message_id": str(uuid.uuid4())
    }
    url = "http://localhost:5005/webhooks/rest/webhook"
    return rq.post(url, json=body).json()


@app.get("/status/")
def get_attempt():
    return {"status": "alive"}
