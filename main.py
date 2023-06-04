from flask import Flask, render_template, json, request, jsonify, make_response
import random

app = Flask(__name__)



@app.route('/')
def home():
	# Returns the homepage to the browser
	return render_template('index.html')

@app.route('/generate', methods=['GET'])
def generate():
 with open('data/quotes.json', 'r') as file:
   quotes = json.load(file)
 return random.choice(quotes['quotes'])

#this generate route gets data from the json file (quotes) opens and reads the folder. The var quotes is the the file loaded up completedly and returns the file at random (because it is an Array/list)

@app.route('/get-quote', methods=['GET'])
def getQuote():
  with open('data/quotes.json', 'r') as file:
    result = json.load(file)
    file.close()
  response = make_response(jsonify(result), 200)
  response.headers["Content-Type"] = "application/json"

  return response

#this getquote function does the same as previous function however it returns a response object with the application/json mimetype set

@app.route('/upload', methods=['GET'])
def upload():
  quote = request.args.get('quote')
  with open('data/quotes.json', 'r') as file:
    data = json.load(file)
  
  data['quotes'].append(quote)

  
  output = open('data/quotes.json', 'w')
  json.dump(data, output)
  
    
  return make_response (
    "Success",
    200
  )
#upload is a function where we add the users input to the json File
#we do this by opening the file and reading the file, loading the file, appending data/user input to the file, writing this to the file and then returning the result

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8080)
