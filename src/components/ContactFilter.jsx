export function ContactFilter({ setFilter, filterBy , addContact}) {
    const handleRef = (elInput) => {
        elInput?.focus()
    }

    return (
        <section className="contact-filter flex">
            <input ref={handleRef} onChange={setFilter} value={filterBy.term} type="text" name="txt" id="txt" placeholder="Search" />
            <button className="flex center" onClick={addContact}><svg xmlns="http://www.w3.org/2000/svg"  width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M18 14v-3h-3V9h3V6h2v3h3v2h-3v3Zm-9-2q-1.65 0-2.825-1.175Q5 9.65 5 8q0-1.65 1.175-2.825Q7.35 4 9 4q1.65 0 2.825 1.175Q13 6.35 13 8q0 1.65-1.175 2.825Q10.65 12 9 12Zm-8 8v-2.8q0-.85.438-1.563q.437-.712 1.162-1.087q1.55-.775 3.15-1.163Q7.35 13 9 13t3.25.387q1.6.388 3.15 1.163q.725.375 1.162 1.087Q17 16.35 17 17.2V20Z"/></svg></button>
        </section>
    )
}
