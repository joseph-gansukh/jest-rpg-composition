const potion = type => {
  let types = ['strength', 'agility', 'health']

  let properties = {  
    type: type || types[Math.floor(Math.random() * types.length)],
    value: 0
  }  

  if (properties.type === 'health') {
    properties.value = Math.floor(Math.random() * 10 + 30);
  } else {
    properties.value = Math.floor(Math.random() * 5 + 7);
  }

  return properties
}

module.exports = potion