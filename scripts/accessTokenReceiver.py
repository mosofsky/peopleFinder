CLIENT_ID = "1748a14705504707a7c7108b249d4dbe"
CLIENT_SECRET = "3fdf94938f71419da0022c90cdd238c2"
REDIRECT_URI = "http://localhost:65010/access_token_callback"

from flask import Flask
app = Flask(__name__)
@app.route('/')
def homepage():
    text = '<a href="%s">Authenticate with Instagram</a>'
    return text % make_authorization_url()

def make_authorization_url():
    # Generate a random string for the state parameter
    # Save it for use later to prevent xsrf attacks
    from uuid import uuid4
    state = str(uuid4())
    save_created_state(state)
    params = {"client_id": CLIENT_ID,
              "response_type": "code",
              "redirect_uri": REDIRECT_URI,
              "state": state}
    import urllib
    url = "https://www.instagram.com/oauth/authorize/?" + urllib.urlencode(params)
    return url

# Left as an exercise to the reader.
# You may want to store valid states in a database or memcache,
# or perhaps cryptographically sign them and verify upon retrieval.
def save_created_state(state):
    pass
def is_valid_state(state):
    return True

from flask import abort, request
@app.route('/access_token_callback')
def access_token_callback():
    error = request.args.get('error', '')
    if error:
        return "Error: " + error
    state = request.args.get('state', '')
    if not is_valid_state(state):
        # Uh-oh, this request wasn't started by us!
        abort(403)
    code = request.args.get('code')
    # We'll change this next line in just a moment
    return "got an access token! %s" % get_token(code)

import requests
#import requests.auth
def get_token(code):
#    client_auth = requests.auth.HTTPBasicAuth(CLIENT_ID, CLIENT_SECRET)
    post_data = {"client_id": CLIENT_ID,
                  "client_secret": CLIENT_SECRET,
                  "grant_type": "authorization_code",
                  "redirect_uri": REDIRECT_URI,
                  "code": code}
    response = requests.post("https://api.instagram.com/oauth/access_token",
#                             auth=client_auth,
                             data=post_data)
    token_json = response.json()
    return token_json["access_token"]

if __name__ == '__main__':
    app.run(debug=True, port=65010)
