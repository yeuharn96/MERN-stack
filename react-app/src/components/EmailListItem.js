import { Button, TableCell, TableRow } from '@mui/material';
import { Component } from 'react';

class EmailListItem extends Component{
    render(){
        return (
            <TableRow hover>
                {this.props.cols?.map((col, idx) => {
                    const value = this.props.row[col.id];
                    return (
                        <TableCell key={`${this.props.row.id}${idx}`}>{value}</TableCell>
                    );
                })}
                <TableCell key={`${this.props.row.id}-opt`} align='right'>
                    <Button color='success' sx={{marginRight: '1rem'}} onClick={() => this.props.onEdit?.call(this,this.props.row.id)}>Edit</Button>
                    <Button color='error' onClick={() => this.props.onDelete?.call(this,this.props.row.id)}>Delete</Button>
                </TableCell>
            </TableRow>
        );
    }
}

export default EmailListItem;