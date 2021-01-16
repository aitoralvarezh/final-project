
function Selector({tab, setTab}) {
    const tabs = ['Perfil', 'Temas', 'Artículos']
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

