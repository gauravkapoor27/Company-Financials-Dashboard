from flask import Flask, make_response
import yfinance as yf
import pandas as pd
import json

app = Flask(__name__)

df = pd.read_html(
    "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies")[0]
df = df[['Symbol', 'Security']]

companies = [{'value': df['Symbol'][x], 'label': df['Security'][x]}
             for x in range(len(df))]


@app.route('/companies')
def companyList():
    return companies, {'Access-Control-Allow-Origin': '*'}


@app.route('/<ticker>')
def ticker(ticker):
    ticker = yf.Ticker(f"{ticker}")
    tickerInfo = json.dumps(ticker.info)

    response = make_response(tickerInfo)

    return response, {'Access-Control-Allow-Origin': '*'}


@app.route('/historical/<ticker>')
def history(ticker):

    ticker = yf.Ticker(f"{ticker}")

    historical_prices = ticker.history(
        period="max", interval="1d")

    date_index = historical_prices.index
    timestamps = (date_index.astype(int)/1000000000).tolist()

    response = make_response([x for x in zip(
        timestamps, historical_prices["Close"])])
    response.headers.add('Access-Control-Allow-Origin',
                         '*')

    return response


if __name__ == '__main__':
    app.run(port=5555, debug=True, use_reloader=True)
