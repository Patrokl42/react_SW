import React from 'react';
import Row from "../row";
import { PersonDetails, PersonList } from '../sw-components';
import { withRouter } from 'react-router-dom';

const PeoplePage = ({ match, history }) => {

    const { id } = match.params;

    return (
        <Row left={<PersonDetails itemId={id} />}
             right={<PersonList onItemSelected={(id) => history.push(id)}/>}/>
    )
};

export default withRouter(PeoplePage);