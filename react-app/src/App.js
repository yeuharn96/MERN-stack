import './App.css';
import { Container, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import EmailList from './components/EmailList';
import InputForm from './components/InputForm';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {
  const refInput = useRef();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    listEmails();
  }, []);

  const listEmails = () => {
    axios.get('/emails').then(res => {
      setRows(res.data);
    });
  };


  const handleInputAdd = (data) => {
    axios.post('/emails/new', data).then(res => listEmails());
  };
  const handleInputEdit = (data) => {
    axios.post('/emails/edit', data).then(res => {
      listEmails();
    });
  };

  const handleListEdit = (id) => {
    const r = rows.find(row => row.id === id);
    refInput.current.setState({
      editId: id,
      email: r.email,
      firstName: r.first_name,
      lastName: r.last_name,
    });
  }
  const handleListDelete = (id) => {
    const r = rows.find(row => row.id === id);
    if (!r) return;

    const msg = `
      Are you sure you want to delete?
      Email: ${r.email}
      First Name: ${r.first_name}
      Last Name: ${r.last_name}
    `;
    if (confirm(msg)) {
      axios.post('/emails/delete', { id }).then(res => listEmails());
    }
  };


  return (
    <div className="App">
      <Container sx={{ paddingTop: '2rem' }}>
        <Typography variant="h1" gutterBottom>
          MERN
        </Typography>
        <InputForm ref={refInput}
          onAddEntry={handleInputAdd}
          onEditEntry={handleInputEdit} />
        <EmailList rows={rows}
          onEdit={handleListEdit}
          onDelete={handleListDelete} />
      </Container>
    </div>
  );
}

export default App;
