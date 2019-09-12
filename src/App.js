import React,{Component} from 'react';
import  {Container, Row, Col}  from 'react-bootstrap';
import './App.css';
import Subtotal from './Components/Subtotal/Subtotal';
import PickupSavings from './Components/PickUpSavings/PickupSavings';
import TaxesFees from './Components/TaxesFees/TaxesFees';
import EstimatedTotal from './Components/EstimatedTotal/EstimatedTotal';
import ItemDetails from './Components/ItemDetails/ItemDetails';
import PromoCode from './Components/PromoCode/PromoCode';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import About from './pages/about';


class App extends Component{
  state = {
    total: 100,
    PickUpSavings: -3.85,
    taxes : 0,
    estimatedtotal: 0,
    newestimatedtotal: 0,
    disablePromoButton: false,
    values: '',
    discount: false,
    diffPriceNewPrice: 0
  }

  componentDidMount = () => {
    this.setState({
      taxes: (this.state.total + this.state.PickUpSavings) * 0.0875
    },
    function() {
      this.setState({
        estimatedtotal: this.state.total + this.state.PickUpSavings + this.state.taxes,
        newestimatedtotal : this.state.total + this.state.PickUpSavings + this.state.taxes
      })
    }
    )
  }
  isDisabledFunction = () => { 
          if(this.state.values=='DISCOUNT'){
            this.state.newestimatedtotal = (this.state.estimatedtotal) * 0.9
            this.state.diffPriceNewPrice = this.state.estimatedtotal - this.state.newestimatedtotal

            this.setState({
              disablePromoButton: true
            })
          }
        }
        handleChange = input => e =>{
        this.setState({[input]: e.target.value.trim()});
    }
    render(){
      return(
        <Router>  
        <div className="container">
          <Container className="purchase-card">
          <Row>
          <Col md={3}></Col>
            <Col md={2}>
            <Link style={linkStyle} to="/">Home</Link>
            </Col>
            <Col md={4}>
             <Link style={linkStyle} to="/about">About</Link>
            </Col>
          </Row>
           
          <Route exact path="/" render={props => (
            <React.Fragment>
          <Subtotal price={this.state.total.toFixed(2)}></Subtotal>
         <PickupSavings price={this.state.PickUpSavings}/>
         <TaxesFees taxes={this.state.taxes.toFixed(2)}></TaxesFees>
         <hr/>
         <EstimatedTotal newprice={this.state.newestimatedtotal.toFixed(2)} ></EstimatedTotal>
         <ItemDetails price={this.state.estimatedtotal.toFixed(2)}
                      newprice={this.state.newestimatedtotal.toFixed(2)}
                      diffprice= {this.state.diffPriceNewPrice.toFixed(2)}              
         />
         <hr/>
        <PromoCode
          giveDiscount={()=> this.isDisabledFunction()}
          isDisabled={this.state.disablePromoButton}
          handleChange={this.handleChange}
        />        
            </React.Fragment>
          )}>
          
        </Route>
        <Route path="/about" component={About}></Route>
         </Container>   
        </div>
        </Router>
      )

    }
}

const linkStyle = {
  color: 'black',
  textDecoration: 'none'
}

export default App;
