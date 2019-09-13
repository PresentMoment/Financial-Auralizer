Uses historical price data for natural gas(source: https://datahub.io/core/natural-gas) to manipulate the Tone.JS (https://tonejs.github.io/) sound engine.

Raw data is in JSON format. DataFetch.js filters for the years leading up, including and following the 2008 financial crisis. Each day's natural gas price is then sent to an array at an interval of 10 milliseconds. This array is then sent to DataFetch's parent component (the sound engine), where it manipulates the sound frequency ("pitch") of the sound engine at the interval previous set at DataFetch.

Further implementations:

- Deploy
