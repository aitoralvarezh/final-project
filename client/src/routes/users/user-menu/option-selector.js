
function Selector({tab, setTab}) {
    const tabs = ['profile', 'topics', 'articles']
    return (
        <div>
            {tabs.map(t =>
                <div className={tab === t ? 'active' : 'normal'}
                    onClick={() => setTab(t)}
                >
                    {t}
                </div>
            )}
        </div>
    )
}


export default Selector;

