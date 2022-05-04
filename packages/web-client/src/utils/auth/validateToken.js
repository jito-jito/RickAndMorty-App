
export default function(decodedToken) {
  const timeStamp = decodedToken.exp * 1000
  const tokenExp = new Date(timeStamp)

  const currentDate = new Date()

  const isValid = currentDate < tokenExp
  
  return isValid
}