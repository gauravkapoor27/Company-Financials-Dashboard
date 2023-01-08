# Company-Financials-Dashboard

This coding project is a web application that utilizes both Flask and JavaScript React to provide a 
dynamic and interactive user experience. 

The frontend of the application is designed to display a financial dashboard for a selected S&P500 listed company, 
providing a range of information to the user such as company financials, stock price data, and a chart showing 
the stock's price over time. Additionally, the frontend includes a description of 
the company and displays the company's website and logo. When the user wants to view data for a different ticker, 
they can simply select a new ticker from the dropdown menu. This action triggers a fetch request, which is sent 
from the JavaScript on the frontend to the local API created using Flask. The API then retrieves the requested data 
for the new ticker and returns it to the frontend, where it is displayed for the user. 

Overall, this project combines the capabilities of Flask and JavaScript React to create a financial dashboard 
that is both informative and easy to use.

## Dashboard
![chart-descr](https://user-images.githubusercontent.com/96806035/211184308-62b480fa-cbbb-4430-b93c-9153702d63ef.gif)

## Tickers List
![tickers_list](https://user-images.githubusercontent.com/96806035/211184316-0f66c0eb-b39c-4d70-9ffe-f8d39d263a27.gif)

## Selecting Ticker
By selecting from dropdown:

![select_update](https://user-images.githubusercontent.com/96806035/211184321-a5f5b31c-4c7d-470e-bcfa-5c2efd9d5853.gif)

By typing company name or ticker symbol:

![type_update](https://user-images.githubusercontent.com/96806035/211184325-dd150d7d-03f6-49ae-8c25-19ccb0b70b14.gif)
















