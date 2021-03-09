import { useState, useEffect } from 'react';

const url = 'https://jsonplaceholder.typicode.com/todos';

function App() {

  const [ data, setData ] = useState([]);
  const [ fildata, setFilData ] = useState([]);
  const [ showModal, setModal ] = useState(false);
  const [ uData, setUserData ] = useState({});

  useEffect( () => {
    const f = async () => {

      const response = await fetch( url );
      let data = await response.json();

      setData(data);
      setFilData(data);
    }
    f();
  },[])

  const fetchUser = async(id) => {
    const response = await fetch (`https://jsonplaceholder.typicode.com/users/${id}`);
    let userData = await response.json();
    const { name, email } = userData;

    const user = data.filter( ( a ) => a.id === id );
    const { userId, title } = user[0];

    console.log(name, email, userId, title)
    setUserData( { ...uData, name, email, userId, title})
    setModal(true);
  }

  const t = (e) => {

    const Fdata  = data.filter( (person) => {

      if( person.title === e.target.value ){
        return person.title === e.target.value
      }
      if( person.id === parseInt(e.target.value) ){
        return person.id === parseInt(e.target.value)
      }
      else if( String(person.completed) === e.target.value ){
        return String(person.completed) === e.target.value
      }
    })
    
    if( Fdata.length > 0 ){
      setFilData(Fdata);
    }
    else{
      setFilData(data);

    }
    console.log(fildata);
}

const close = () => {
    setModal(false);                       
};

const ascending =  () => {
  function compare(a, b) {
    return b.id - a.id;
  }
  const acData =  [...fildata].sort(compare);
  setFilData(acData);
}
const descending =  () => {
  function compare(a, b) {
    return a.id - b.id;
  }
  const acData =  [...fildata].sort(compare);
  setFilData(acData);
}

  return (
    <div className="App" onClick={()=> setModal(false)}>
      <header >
        <h1 className='heading'>Todos</h1>
        <div className='inp'>
          <label></label>
          <input 
            type="text"
            onChange={ t }
            placeholder='Search...'/>
        </div>
        <div className='img' >
          <button 
            className='amount-btn' 
            onClick={descending}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
            </svg>
          </button>
          <button className='amount-btn'
          onClick={ascending} >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </button>
        </div>
        <div>
          <table>
            <tr>
              <th>Todo Id</th>
              <th>Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          {  fildata.map( (m) => {
            const { id, title, completed } = m
            {console.log('i ran')}
            return (
                  <tr key={id}>
                    <th>{id}</th>
                    <th>{title}</th>
                    <th>{ completed ? 'true': 'false' }</th>
                    <th><button
                          onClick={ ()=> fetchUser(id) }
                            >ViewUser
                        </button>
                    </th>
                  </tr>
            )}) 
          }
          </table>
        </div>
        {
          showModal && 
                      <div className={ showModal ? 'modal': 'modal close'} >
                        <div className="modal-backdrop"></div> 
                        <div className="modal-body">
                          <h3>User Details</h3>
                          <button 
                          onClick= {close}
                          className="modal-close" 
                          id="close"
                          >close
                          </button>
                          <ul>
                            <li>
                            Name : { uData.name }
                            </li>
                            <li>
                            Email: { uData.email }
                            </li>
                            <li>
                            UserID: { uData.userId }
                            </li>
                            <li>
                            Title: { uData.title }
                            </li>
                          </ul>
                        </div>
                      </div>
        }
      </header>
    </div>
  );
}

export default App;