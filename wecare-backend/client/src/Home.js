import React, { Component, Image, StyleSheet, useState } from 'react';
import logo from './logo.svg';
import {
  Box,
  Button,
  Heading,
  Grommet,
  Menu,
  FormField,
  TextInput,
  Select,
  Text,
  Grid


} from 'grommet';

import './App.css';
import backdrop from './img/hmsbackdrop.jpg'

const theme = {
  global: {
      colors: {
          brand: '#00739D',
      },
      font: {
          family: 'Lato',
      },
  },
};

const SidebarButton = ({ label, ...rest }) => (
  <Button plain {...rest}>
      {({ hover }) => (
          <Box
              background={hover ? "#DADADA" : undefined}
              pad={{ horizontal: "large", vertical: "medium" }}
          >
              <Text size="large">{label}</Text>
          </Box>
      )}
  </Button>
);

const SidebarButtons = () => {
  const [active, setActive] = useState();
  return (
      <Grommet full theme={theme}>
          <Box fill direction="row">
              <Box background="brand">
                  {["Appointments", "Medical History", "Settings"].map(label => (
                      <SidebarButton
                          key={label}
                          label={label}
                          active={label === active}
                          onClick={() => {
                              if (label === "Appointments") {
                                  window.location = "/to do"
                              }
                              else if (label === "Medical History") {
                                  window.location = "/MedHist"
                              }
                              else if (label === "Settings") {
                                  window.location = "/Settings"
                              }
                              setActive(label);
                          }}
                      />
                  ))}
              </Box>
          </Box>
      </Grommet>
  );
};
export class Home extends Component {


  state = { names: [] }

  componentDidMount() {

    this.getNames();
    console.log(this.state.names);
  }

  getNames = _ => {
    fetch('http://localhost:3001/names')
      .then(res => res.json())
      .then(res => this.setState({ names: res.data }));
  }

  renderName = ({ name, email }) => <div key={email}>{name} {name}</ div>

  render() {
    const { names } = this.state;

    const Header = () => (
      <Box
        tag='header'
        background='brand'
        pad='small'
        elevation='small'
        justify='between'
        direction='row'
        align='center'
        flex={false}
      >
        <Heading level={3} margin='none'>
          <strong>WeCare</strong>
        </Heading>

      </Box>
    );

    const Body = () => (
      <div className="container">
        <div className="panel panel-default p50 uth-panel">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>name</th>
                <th>email</th>
                <th>address</th>
              </tr>
            </thead>
            <tbody>
              {names.map(patient =>
                <tr key={patient.id}>
                  <td>{patient.name} </td>
                  <td>{patient.email}</td>
                  <td>{patient.address}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    );


    return (
      <Grommet full={true}
      theme = {theme} >
        <Box fill={true}>
          <Header />
          <Grid
            fill
            rows={['auto', 'flex']}
            columns={['auto', 'flex']}
            areas={[
              { name: 'sidebar', start: [0, 1], end: [0, 1] },
              { name: 'main', start: [1, 1], end: [1, 1] },
            ]}>
            <Box
              gridArea="sidebar"
              width="small"
              animation={[
                { type: 'fadeIn', duration: 300 },
                { type: 'slideRight', size: 'xlarge', duration: 150 },
              ]}
            >
              <SidebarButtons />
            </Box>
            <Box
              gridArea="main"
              justify="center"
              align="center">
              <Body />
            </Box>
          </Grid>


        </Box>
      </Grommet>
    );




  }
}

export default Home;