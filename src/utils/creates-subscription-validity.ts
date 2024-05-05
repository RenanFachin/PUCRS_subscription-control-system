export function createsSubscriptionValidity() {
  const date = new Date()
  const subscriptionValidity = date.setDate(date.getDate() + 30)

  return new Date(subscriptionValidity)
}
