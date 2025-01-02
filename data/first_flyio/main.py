from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, Tailscale + FastAPI + Fly.io!"}



@app.get("/iframe", response_class=HTMLResponse)
def iframe():
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>IFrame Page</title>
        <style>
            html, body, iframe {
                margin: 0;
                padding: 0;
                height: 100%;
                width: 100%;
                border: none;
            }
            iframe {
                display: block;
            }
        </style>
    </head>
    <body>
        <iframe src="https://www.dynabot.dev/tools/supabase"></iframe>


        <iframe src="https://gpu.jerboa-kokanue.ts.net/"></iframe>

    </body>
    </html>
    '''
