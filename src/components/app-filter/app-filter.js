import './app-filter.css';

const AppFilter = (props) => {
    const buttonsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'rise', label: 'На повышение'},
        {name: 'moreThen1000', label: 'З/П больше 1000$'},
    ];

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name;
        let clazz = active ? 'btn btn-light' : 'btn btn-outline-light';

        return (
            <button 
                className={clazz}
                type="button"
                key={name}
                onClick={() => props.onFilterSelect(name)}>
                {label}
            </button>  
        )
    });

    return (
        <div className="bth-group">
            {buttons}
        </div>
    );
};

export default AppFilter;