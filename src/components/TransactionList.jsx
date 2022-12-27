import { TransactionPreview } from "./TransactionPreview";

export function TransactionList({ transactions, contacts, rate, title ='dcdc'}) {
    return (
        <section className="transaction-list">
            <h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M2 8a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2H3Z"/></svg>
                {title}
            </h1>
            {transactions.map(transaction => <TransactionPreview key={transaction.at} transaction={transaction} contacts={contacts} rate={rate} />)}
        </section>
    )
}
