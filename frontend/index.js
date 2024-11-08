async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here

  let emoji = descriptions.find(description => description[0] === 'Snowy')[1]
  console.log(emoji)

  const weatherWidget = document.querySelector('#weatherWidget')
  weatherWidget.style.display = 'none'

  const dropdown = document.querySelector('#citySelect')

  dropdown.addEventListener('change', evt => {
    console.log('selected option: ', evt.target.value)

    dropdown.disabled = true
    weatherWidget.style.display = 'none'
    document.querySelector('.info').textContent = 'Fetching weather data...'

    let city = evt.target.value
    let url = `http://localhost:3003/api/weather?city=${city}`

    axios.get(url)
      .then(res => {
        console.log(res.data)
        weatherWidget.style.display = 'block'
        document.querySelector('.info').textContent = ''

        let { data } = res


        document.querySelector('#apparentTemp div:nth-child(2)')
          .textContent = data.current.apparent_temperature + '°'
        document.querySelector('#todayDescription')
          .textContent = descriptions.find(description => description[0] === data.current.weather_description)[1]
        document.querySelector('#todayStats div:nth-child(1)')
          .textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`
        document.querySelector('#todayStats div:nth-child(2)')
          .textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`
        document.querySelector('#todayStats div:nth-child(3)')
          .textContent = `Humidity: ${data.current.humidity}%`
        document.querySelector('#todayStats div:nth-child(4)')
          .textContent = `Wind: ${data.current.wind_speed}m/s`

        data.forecast.daily.forEach((day, idx) => {
          let card = document.querySelectorAll('.next-day')[idx]

          let weekDay = card.children[0]
          let apparent = card.children[1]
          let minMax = card.children[2]
          let precipitation = card.children[3]

          weekDay.textContent = getWeekDay(day.date)
          apparent.textContent = descriptions.find(description => description[0] === day.weather_description)[1]
          minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`
          precipitation.textContent = 'Precipitation: '+ (day.precipitation_probability * 100)+'%'
        })

        document.querySelector('#location div:nth-child(1)')
          .textContent = city


      })
      .catch(error => {
        console.log(error.message)
      })
      .finally(() => {
        dropdown.disabled = false
      })

  })
  function getWeekDay(date) {
    // Step 1: Parse the date string into individual parts (year, month, day)
    const [year, month, day] = date.split("-").map(Number);
    console.log("Parsed date:", { year, month, day });  // Log the parsed year, month, day
  
    // Step 2: Create a new Date object using Date.UTC to ensure UTC time zone
    const dayObj = new Date(Date.UTC(year, month - 1, day));  // month is 0-indexed in JavaScript
    console.log("Date object (in UTC):", dayObj);  // Log the Date object created in UTC
  
    // Step 3: Get the day of the week in UTC using getUTCDay()
    const weekdayIndex = dayObj.getUTCDay();
    console.log("Day of the week index (UTC):", weekdayIndex);  // Log the index of the day (0=Sunday, 6=Saturday)
  
    // Step 4: Map the day index to the full weekday name
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdayName = weekdays[weekdayIndex];
    console.log("Mapped weekday name:", weekdayName);  // Log the weekday name
  
    return weekdayName;  // Return the weekday name
  }
  





  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
