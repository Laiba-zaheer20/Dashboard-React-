import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import WidgetText from './widgetText';
import WidgetBar from './widgetBar';
import WidgetDoughnut from './widgetDoughnut';
import { Col,Row,Container } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import MultiSeries from './multiSeries';

const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;


class dashboard extends Component {
    constructor(){
super();
this.state={
    items:[],
    dropdownOptions:[],
selectedValue:null,
organicSource:null,
directSource:null,
referralSource:null,
pageViews:null,
users:null,
newUsers:null,
sourceArr:[],
userArr:[],
allInOne:[],
}
    }
getData= arg =>{
const arr=this.state.items;
const arrLen =arr.length;
let organicSource=0;
let directSource=0;
let referralSource=0;
let pageViews=0;
let users=0;
let newUsers=0;
let sourceArr=[];
let userArr=[];
let selectedValue=null;
let allInOne=[];

for(let i=0;i<arrLen;i++){
    if(arg == arr[i]["month"]){
        organicSource=arr[i].organic_source;
        directSource=arr[i].direct_source;
        referralSource=arr[i].referral_source;
        pageViews=arr[i].page_views;
        users=arr[i].users;
        newUsers=arr[i].new_users;
      allInOne.push(
        {
            label: "Organic Source",
            value: arr[i].organic_source
          },
          {
            label: "Direct Source",
            value: arr[i].direct_source
          },
          {
            label: "Referral Source",
            value: arr[i].referral_source
          },      {
            label: "Users",
            value: arr[i].users
          },
          {
            label: "New Users",
            value: arr[i].new_users
          },
      )
        sourceArr.push(
              {
                label: "Organic Source",
                value: arr[i].organic_source
              },
              {
                label: "Direct Source",
                value: arr[i].direct_source
              },
              {
                label: "Referral Source",
                value: arr[i].referral_source
              }
            )
            userArr.push(
                {
                  label: "Users",
                  value: arr[i].users
                },
                {
                  label: "New Users",
                  value: arr[i].new_users
                },
                
              )
    }
}

selectedValue=arg;
this.setState({
organicSource:organicSource,
directSource:directSource,
referralSource:referralSource,
pageViews:pageViews,
users:users,
newUsers:newUsers,
sourceArr:sourceArr,
userArr:userArr,
allInOne:allInOne,
})
}
updateDashboard=event=>{
this.getData(event.value);
this.setState(
    { selectedValue:event.value},()=>{
        console.log(this.state.users)
    }
);
}

    componentDidMount(){
            fetch(url)
            .then(response => response.json())
            .then(data => {

                let batchRowValues = data.valueRanges[0].values;

                const rows = [];

                for (let i = 1; i < batchRowValues.length; i++) {
                    let rowObject = {};
                    for (let j = 0; j < batchRowValues[i].length; j++) {
                        rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                    }
                    rows.push(rowObject);
                }
            
              // dropdown options
              let dropdownOptions = [];

              for (let i = 0; i < rows.length; i++) {
                  dropdownOptions.push(rows[i].month);
              }

              dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
              this.setState(
                  {
                      items: rows,
                      dropdownOptions: dropdownOptions,
                      selectedValue: "Jan 2018"
                  },
                  () => this.getData("Jan 2018")
              );

    });}
    render() {

        const chartData = [
            {
              label: "Venezuela",
              value: "290"
            },
            {
              label: "Saudi",
              value: "260"
            }
          ];
        
        return (
            <div>
              
              <Container>
                  <Row className="topHeader">
                      <Col class="hell">
                      Dashboard
                      </Col>
                      <Col class="hell2" style={{  backgroundColor:'#73a47',fontFamily: "Arial" }}>
                      <div  style={{  fontSize: "25px" , backgroundColor:'#73a47'}}>
                      <Dropdown  style={{backgroundColor:'#73a47'}} options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" />
                      </div>
                      </Col>
                  </Row>
                  </Container>

                  <Container>
                         <Row className="mainDashboard Row" >
                            <Col className="hello">
                            <WidgetText title="Organic Source" value={this.state.organicSource} />
                            </Col>
                            <Col className="hello">
                            <WidgetText title="New Users" value={this.state.newUsers} />
                            </Col>
                            <Col className="hello">
                            <WidgetText title="Users" value={this.state.users} />
                            </Col>
                            <Col className="hello">
                            <WidgetText title="referral Source" value={this.state.referralSource} />
                            </Col>
                            
                            <Col className="hello">
                            <WidgetText title="direct Source" value={this.state.directSource} />
                            </Col>

                            <Col>
                            <MultiSeries title="All Data In One" data={this.state.allInOne} />
                            </Col>

                            <Col>
                            <WidgetDoughnut title="Users Comparison" data={this.state.userArr} />
                            </Col>
                        </Row>
                        <Row>
                        <Col>
                        <WidgetBar title="Source Comparison" data={this.state.sourceArr} />
                       </Col>

                        </Row>
                  </Container>
            </div>
            );
    }    
}

export default dashboard
