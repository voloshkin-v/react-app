import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployeesAddForm from '../employers-add-form/employers-add-form';

import './app.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Roma P.' , salary: 800, rise: true, increase: false, id: 1},
                {name: 'Max B.' , salary: 900, rise: false, increase: false, id: 2},
                {name: 'John S.' , salary: 1000, rise: false, increase: false, id: 3}
            ],
            term: '',
            filter: 'all'
        };

        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        }); 
    };

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false, 
            rise: false,
            id: this.maxId++
        };

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    };

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }));
    };

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        } 

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        });
    };

    onUpdateSearch = (term) => {
        this.setState({
            term: term
        })
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);

            case 'moreThen1000': 
                return items.filter(item => item.salary > 1000);

            default: 
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increasedEmployees = this.state.data.filter(item => item.increase === true).length;

        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        
        return (
            <div className="app">
                <AppInfo employees={employees} increasedEmployees={increasedEmployees} />
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
                </div>
    
                <EmployersList 
                    data={visibleData} 
                    onDelete={this.deleteItem} 
                    onToggleProp={this.onToggleProp}
                />

                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;