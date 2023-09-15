module.exports = {
  getListOfCustomers,
}

function getListOfCustomers() {
  return 'exec dbo.USER_SP_CustomersGet @sessionId';
}