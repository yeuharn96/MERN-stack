import { TextField, Grid, Button } from '@mui/material';
import { Component } from 'react';
import { Box } from '@mui/system';

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editId: null,
            email: '',
            firstName: '',
            lastName: '',
            emailError: false
        };
    }

    handleAdd() {
        this.props.onAddEntry?.call(this, {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        });
        this.clearInput();
    }
    handleEdit() {
        this.props.onEditEntry?.call(this, {
            id: this.state.editId,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        });
        this.clearInput();
    }

    clearInput() {
        this.setState({
            editId: null,
            email: '',
            firstName: '',
            lastName: '',
            emailError: false
        });
    }
    validateEmail(e) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const email = e.target.value;
        // email is not blank and is valid email format
        this.setState({ emailError: email.length > 0 && !regex.test(email) });
    }
    isAllowSubmit() { // return true if all input are valid
        return this.state.email.length > 0 && !this.state.emailError &&
            this.state.firstName.length > 0 &&
            this.state.lastName.length > 0;
    }

    render() {
        return (
            <Box component="form" noValidate autoComplete='off'>
                <Grid container sx={{ marginBottom: '2.5rem' }} spacing={5}>
                    <Grid item sm={4}>
                        <TextField
                            fullWidth
                            required
                            variant="standard"
                            label="Email"
                            error={this.state.emailError}
                            helperText={this.state.emailError && 'Invalid email address.'}
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                            onInput={(e) => this.validateEmail(e)}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            fullWidth
                            required
                            variant="standard"
                            label="First Name"
                            value={this.state.firstName}
                            onChange={(e) => this.setState({ firstName: e.target.value })}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            fullWidth
                            required
                            variant="standard"
                            label="Last Name"
                            value={this.state.lastName}
                            onChange={(e) => this.setState({ lastName: e.target.value })}
                        />
                    </Grid>
                    <Grid item sm={2}>
                        <Button variant='outlined' fullWidth onClick={() => this.clearInput()}>Clear</Button>
                    </Grid>
                    <Grid item sm={8}></Grid>
                    <Grid item sm={2}>
                        {this.state.editId ?
                            <Button variant='contained' fullWidth onClick={() => this.handleEdit()} disabled={!this.isAllowSubmit()}>Save</Button> :
                            <Button variant='contained' fullWidth onClick={() => this.handleAdd()} disabled={!this.isAllowSubmit()}>Add</Button>
                        }
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default InputForm;