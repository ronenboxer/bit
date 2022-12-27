export function TransactionPreview({ transaction, contacts, rate }) {
    let date = new Date(transaction.at).toLocaleDateString() + ' | ' + new Date(transaction.at).toLocaleTimeString()
    const target = contacts.find(contact => contact._id === transaction[(transaction.to ? 'to' : 'from')])
    return (
        <section className="transaction-preview">
            <h1 className="title">{transaction.to ? 'To' : 'From'} {target.name}</h1>
            <p className="amount"><span className="btc">&#8383; {+transaction.amount.toLocaleString()}</span> | <span className="usd">$ {(+transaction.amount * +rate).toLocaleString()}</span></p>
            <p className="status">Status: <span>Approved</span></p>
            <small className="date">{date}</small>
        </section>
    )
}
