import './app-info.css';

const AppInfo = ({employees, increasedEmployees}) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании OMG-Agency</h1>
            <h2>Общее число сотрудников: {employees}</h2>
            <p>Премию получат: {increasedEmployees}</p>
        </div>
    );

};

export default AppInfo;