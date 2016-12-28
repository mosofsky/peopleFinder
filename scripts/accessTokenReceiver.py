CLIENT_ID = "1748a14705504707a7c7108b249d4dbe"
CLIENT_SECRET = "3fdf94938f71419da0022c90cdd238c2"
HOST_BASE_URI = "http://localhost:65010/" 
REDIRECT_URI_SUFFIX = "access_token_callback"
REDIRECT_URI = HOST_BASE_URI + REDIRECT_URI_SUFFIX
TAGS_API_WRAPPER_URI_SUFFIX = "tags_api_wrapper"
TAGS_API_WRAPPER_URI = HOST_BASE_URI + TAGS_API_WRAPPER_URI_SUFFIX
INSTAGRAM_AUTH_API_URL = "https://www.instagram.com/oauth/authorize/"
INSTAGRAM_BASE_URI = "https://api.instagram.com/"

import requests

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
    url = INSTAGRAM_AUTH_API_URL + "?" + urllib.urlencode(params)
    return url

# Left as an exercise to the reader.
# You may want to store valid states in a database or memcache,
# or perhaps cryptographically sign them and verify upon retrieval.
def save_created_state(state):
    pass
def is_valid_state(state):
    return True

from flask import abort, request
@app.route('/' + REDIRECT_URI_SUFFIX)
def access_token_callback():
    error = request.args.get('error', '')
    if error:
        return "Error: " + error
    state = request.args.get('state', '')
    if not is_valid_state(state):
        # Uh-oh, this request wasn't started by us!
        abort(403)
    code = request.args.get('code')
    access_token = get_token(code)
    html = '<h3>What hashtag do you want to retrieve people for (omit "#")?</h3>' + '\n'
    html += '<form action="%s" method="get">' + '\n'
    html = html % TAGS_API_WRAPPER_URI
    html += '<input type="text" name="hashtag">' + '\n'
    html += '<input type="hidden" name="access_token" value="%s">' + '\n'
    html = html % access_token
    html += '</form>' + '\n'
    return html

@app.route('/' + TAGS_API_WRAPPER_URI_SUFFIX)
def tags_api_wrapper():
    access_token = request.args.get('access_token', 'ACCESS_TOKEN_MISSING')
    hashtag = request.args.get('hashtag', 'HASHTAG_MISSING')
    params = {"access_token": access_token}
    import urllib
    url = INSTAGRAM_BASE_URI + "v1/tags/" + hashtag + "/media/recent?" + urllib.urlencode(params)
    response = requests.get(url)
    tagset = set()

    for repetition in range(0, 3):
      print "##### Doing repetition " + str(repetition)
      tags_json = response.json()
      data_json = tags_json['data']
      for data_json in data_json:
        tagset.add(data_json['user']['username'])
      next_url = response.json()['pagination']['next_url']
      print "   next_url = " + next_url
      response = requests.get(next_url)
    
    html = '<h3>Instagram users who mentioned ' + hashtag + '</h3>' + '\n'
    for username in tagset:
      html += username + '<br>' + '\n'
    return html
    
def get_token(code):
    post_data = {"client_id": CLIENT_ID,
                  "client_secret": CLIENT_SECRET,
                  "grant_type": "authorization_code",
                  "redirect_uri": REDIRECT_URI,
                  "code": code}
    response = requests.post(INSTAGRAM_BASE_URI + "oauth/access_token",
                             data=post_data)
    token_json = response.json()
    return token_json["access_token"]

if __name__ == '__main__':
    app.run(debug=True, port=65010)
