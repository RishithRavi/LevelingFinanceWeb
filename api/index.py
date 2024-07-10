import yfinance as yf
from fastapi import FastAPI, HTTPException

app = FastAPI()


@app.get("/stock/{ticker}")
async def get_stock_price(ticker: str):
    try:
        stock = yf.Ticker(ticker)
        curPrice = stock.info.get("currentPrice")
    # hist = stock.history(period="1d")
    except AttributeError:
        raise HTTPException(status_code=404, detail="Could not parse stock price")
    return curPrice
