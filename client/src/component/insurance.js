import React, { Component } from "react";
import { Card, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import axios from 'axios'
import { withRouter, Redirect } from 'react-router-dom'
import uuid from 'react-uuid'

class Insurance extends Component {
  constructor(props) {
    super(props)
        this.state = {
        name: '',
        type: '',
        show: false,
        phone: '',
        amount: '',
        image: '',
        imageDatas: null,
        data: [],
        select: '',
        variation: '',
        service: '',
        all: [],
        selectState: '',
        hospitalState: '',
        hospitalTown: '',
        localState: ''
      }
  };

   handleChange = e => {
		const {name, value} = e.target;
		this.setState({ [name]: value })
	}

   componentDidMount() {
    this.data(`${process.env.REACT_APP_IMAGE_INSURANCE}`)
    this.FetchPromise();
  }

  data = (url) => {
    axios.get(url)
        .then(json => {
            this.setState({ imageDatas: json.data })
        })
        .catch(response => console.log(response))
  }

  FetchPromise = () => {
    // all apis
    const first = fetch(process.env.REACT_APP_INSURANCE_FIRST).then(resp => resp.json());
    const second = fetch(process.env.REACT_APP_INSURANCE_SECOND).then(resp => resp.json());
    const third = fetch(process.env.REACT_APP_INSURANCE_THIRD).then(resp => resp.json());
    const fourth = fetch(process.env.REACT_APP_INSURANCE_FOURTH).then(resp => resp.json());
    const fifth = fetch(process.env.REACT_APP_HOSPITAL_INDURANCE).then(resp => resp.json());

    Promise.all([first, second, third, fourth, fifth])
      .then(files => {
        console.log(files)
        this.setState({ ...this.state, data: files });
      })
      .catch(err => console.log(err))
  }

  handleSubmit = e => {
    e.preventDefault();
    // gets the state
    const { name, email, phone, amount, select, variation, service } = this.state;


    // pushes code details to paidTransaction
    this.props.history.push({
      pathname: '/paid',
      search: '?query=abc',
      state: { detail: { name, email, phone, amount, select, variation, service } }
    })
  }

  showModal = (data) => {
    this.setState({ show: true, image: data.image });
  };

  handleAirtimeModal = (props) => {
    this.setState({ show: true, image: props.image, type: props.type, name: props.name, service: props.serviceID });
  }
  
  selectClick = (props) => {
    this.setState({ variation: props.variation });
  }
  
  Submit = (e) => {
    this.setState({ select: e.target.value })
  }
  
  Submits = (e) => {
    //console.log(e.target.value)
    this.setState({ selectState: e.target.value })
  }
  
  SubmitsOption = (e) => {
    this.setState({ hospitalState: e.target.value })
  }
  
  SubmitsTown = (e) => {
    this.setState({ hospitalTown: e.target.value })
  }

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
  const {isAuthenticated} = this.props
  if(isAuthenticated=== false) return <Redirect to="/login" /> 
  const { imageDatas, data } = this.state
 
  if (!data || !data.length) return  null;

  const options = {};
  const [first, second, third, fourth, fifth] = data;

  options["first"] = first.content.variations;
  options["second"] = second.content.variations;
  options["third"] = third.content.variations;
  options["fourth"] = fourth.content.variations;
  options["fifth"] = fifth.content.options
  
  const firstData = first.content.variations.map((firstdata, index) => {
    return (
      <>
        <option value={firstdata.name} key={index} onClick={() => this.selectClick({variation: firstdata.variation_code })}>
          {firstdata.name}
        </option>
      </>
    )
  })

  const secondData = second.content.variations.map((seconddata, index) => {
    return (
      <>
        <option value={seconddata.name} key={index} onClick={() => this.selectClick({variation: seconddata.variation_code })}>
          {seconddata.name}
        </option>
      </>
    )
  })

  const thirdData = third.content.variations.map((thirddata, index) => {
    return (
      <>
        <option value={thirddata.name} key={index} onClick={() => this.selectClick({variation: thirddata.variation_code })}>
          {thirddata.name}
        </option>
      </>
    )
  })
  
  const fourthData = fourth.content.variations.map((fourthdata, index) => {
    return (
      <>
        <option value={fourthdata.name} key={index} onClick={() => this.selectClick({variation: fourthdata.variation_code })}>
          {fourthdata.name}
        </option>
      </>
    )
  })
  
  if (!imageDatas) return  null;
  const Imagedatas = imageDatas.content.map((imagedata, index) => {
    return (
            <div key={index}>
                <Card onClick={() => this.handleAirtimeModal({ image: imagedata.image, type: imagedata.name, name: imagedata.name, serviceID: imagedata.serviceID })} className="btn secondtabs" style={{ width: '12rem', height: '11rem' }}>
                    <Card.Body>
                        <img width="60" height="50" className="pr-2" src={imagedata.image} />
                        <Card.Text>
                          {imagedata.name}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
  })
  
    const hospitals = Object.values(fifth.content.options).map((newKey, index) => {
        const list = newKey.split("<>")
        //const allList = list.replace(/\(.*\)/, "").trim()
        const fullList = list.map(item => item)
        //const allList = fullList[0].replace(/\(.*\)/, "").trim()
        //console.log(list)
        //console.log(fullList)
        return fullList
    })
    
    //console.log(hospitals)
    
    //console.log(fifth.content.options)
    const dictionary1 = {};
    dictionary1["Abia"] = ["umuahia", "ohafia", "arochukwu", "aba"]
    dictionary1["Adamawa"] = ["yola", "mubi"]
    dictionary1["Akwa Ibom"] = ["uyo", "oron", "ikot_ekpene", "eket"]
    dictionary1["Anambra"] = ["onitsha", "nnewi", "ihiala", "awka"]
    dictionary1["Bauchi"] = ["bauchi"]
    dictionary1["Bayelsa"] = ["yenagoa", "brass"]
    dictionary1["Benue"] = ["otukpo", "makurdi", "gboko"]
    dictionary1["Borno"] = ["maiduguri"]
    dictionary1["Delta"] = ["warri", "warri-udu", "ughelli", "sapele", "obiaruku", "kwale", "effurun", "asaba", "agbor"]
    dictionary1["Ebonyi"] = ["afikpo", "abakaliki"]
    dictionary1["Edo"] = ["uromi", "oredo", "auchi", "ekpoma", "benin"]
    dictionary1["Ekiti"] = ["ido-ekiti", "emure-ekiti", "aramoko", "ado_ekiti", "omuo-ekiti"]
    dictionary1["Enugu"] = ["uwani", "trans_ekulu", "nsuka", "aira", "ngwo", "awkunanaw", "abakpa"]
    dictionary1["FCT"] = ["gwagwalada", "galadimawa", "wuse_2", "lugbe", "kubwa", "gwarimpa", "garki_2"]
    dictionary1["gombe"] = ["gombe"]
    dictionary1["Imo"] = ["owerri", "okigwe", "mbaisie", "ikeniegbu", "aladinma/owerri"]
    dictionary1["Jigawa"] = ["dutse, garki"]
    dictionary1["Jos"] = ["jos"]
    dictionary1["Kaduna"] = ["kafanchan", "kaduna"]
    dictionary1["kano"] = ["kano", "hotoro", "gyadi"]
    dictionary1["katsina"] = ["katsina"]
    dictionary1["Kebbi"] = ["yauri", "birnin-kebbi", "aliero"]
    dictionary1["Kogi"] = ["inoziomi", "lokoja", "idah", "anyigba"]
    dictionary1["Kwara"] = ["offa", "omu-aran", "ilorin"]
    dictionary1["Lagos"] = ["okota", "yaba", "ojodu", "surulere", "shomolu", "papa-ajao", "oshodi", "onikan", "olodi-apapa", "okokomaiko", "ojokoro", "ojo-iba", "ogba", "obanikoro", "mushin", "mieran_ijaye", "magodo", "lekki-ikota", "lekki-abijo-ajah", "lekki", "lekki_-_osapa", "lasu_road", "lakowe_ibeju-lekki", "ketu", "ketu-ikosi", "dopemu/alimosho", "iyana-ipaja", "isolo", "ipaja", "ilupeju", "ilasamaja", "ikotun", "ikotun-egbe", "ikorodu", "ikeja", "ikeja-omole", "iju-ishaga", "ijaiye-ojokoro", "ifako-ijaiye", "iba", "gbagada", "amuwo_odofin", "festac", "epe", "bariga", "badagry", "apapa", "alagbado", "alaba", "akoka", "ejigbo", "akowonjo", "ajao_estate", "ajah", "ajah-olokunla", "aguda", "abule-egba", "shangisha"]
    dictionary1["Nasarawa"] = ["mararara", "lafia", "keffi"]
    dictionary1["Niger"] = ["suleja", "minna", "kontagora", "bida"]
    dictionary1["Ondo"] = ["owo", "ore", "ondo_town", "okitipupa", "ikare-akoko", "akure"]
    dictionary1["Ogun"] = ["owode", "sango-ota", "sagamu", "mowe", "ijebu-ode", "arepo/wawa", "arepo", "akute", "agbara", "abeokuta"]
    dictionary1["Osun"] = ["osogbo", "ipetumodu", "ilesa", "ile-ife", "ikirun", "ede", "ila-orangun"]
    dictionary1["Oyo"] = ["saki", "oyo", "ogbomosho", "ibadan"]
    dictionary1["Rivers"] = ["omoku", "egbema", "eleme", "woji", "trans_amadi", "rumuogba", "port_harcourt", "obigbo", "oyigbo", "bonny_island", "ugep", "ogoja", "obudu", "obubra", "ikom", "calabar", "akamkpa", "abakpa_ogoja", "ahoada"]
    dictionary1["Sokoto"] = ["sokoto", "illela"]
    dictionary1["Taraba"] = ["jalingo"]
    dictionary1["Yobe"] = ["potiskum", "damaturu"]
    dictionary1['Zamfara'] = ["gusau"]
    dictionary1['Zaria'] = ["sabon_gari", "zaria"]
    
    console.log(this.state.hospitalTown)
  
    return (
      <div>
      <Modal size={this.state.type === "Health Insurance - HMO  " ? "lg" : ''} show={this.state.show} onHide={this.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img width="50" src={this.state.image} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div>
		<form className="forms" onSubmit={this.handleSubmit}>

			<div className={this.state.type === "Health Insurance - HMO  " ? "new" : '' }>
			    <div>
			    {this.state.type == "Third Party Motor Insurance - Universal Insurance" && (<>
                  <p>Data type: </p>
                    <select className="dataDrop" onChange={this.Submit} style={{ width: '100%', marginBottom: '5%', padding: '5px' }} id="cars" name="cars">
                    <option>Select Event Type</option>
                     {firstData}
                    </select>
                </>)}

                {this.state.type == "Health Insurance - HMO  " && (<>
                  <p>Data type: </p>
                    <select className="dataDrop" onChange={this.Submit} style={{ width: '100%', marginBottom: '5%', padding: '5px' }} id="cars" name="cars">
                     <option>Select Event Type</option>
                     {secondData}
                    </select>
                </>)}

                {this.state.type == "Personal Accident Insurance" && (<>
                  <p>Data type: </p>
                    <select className="dataDrop" onChange={this.Submit} style={{ width: '100%', marginBottom: '5%', padding: '5px' }} id="cars" name="cars">
                    <option>Select Event Type</option>
                     {thirdData}
                    </select>
                </>)}
                
                {this.state.type == "Home Cover Insurance" && (<>
                  <p>Data type: </p>
                    <select className="dataDrop" onChange={this.Submit} style={{ width: '100%', marginBottom: '5%', padding: '5px' }} id="cars" name="cars">
                    <option>Select Event Type</option>
                     {fourthData}
                    </select>
                </>)}

                <div className="forms-form-group">
                  <p>Phone Number</p>
                  <input 
                    type="tel" 
                    id="quantity"
                    value={this.state.phone}
                    name="phone"
                    placeholder="Enter phone number"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="forms-form-group">
                  <p>Email Address</p>
                  <input 
                    type="email" 
                    className="email" 
                    value={this.state.email}
                    name="email"
                    placeholder="Enter Email"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="forms-form-group">
                  <p>Amount</p>
                  <input 
                    type="tel" 
                    className="password" 
                    value={this.state.amount}
                    name="amount"
                    placeholder="Enter Amount"
                    onChange={this.handleChange}
                    />
                </div>
			  </div>
            
            <div>
                {this.state.type == "Health Insurance - HMO  " && (
                <>
                  <p>State: </p>
                    <select className="dataDrop" onChange={this.Submits} style={{ width: '100%', marginBottom: '5%', padding: '5px' }}>
                    <option>Select State</option>
                    {
                        Object.keys(dictionary1).map((allDict, index) => {
                            return (
                                <option key={index}>{allDict}</option>
                            )
                        })
                    }
                    </select>
                </>
                )}
                
                {this.state.type == "Health Insurance - HMO  " && (<>
                  <p>State: </p>
                    <select className="dataDrop" onChange={this.SubmitsTown} style={{ width: '100%', marginBottom: '5%', padding: '5px' }}>
                    <option>Select Town</option>
                    {
                        this.state.selectState && 
                        dictionary1[this.state.selectState].map(allDict => (
                            <option>{allDict}</option>
                            )
                        )
                    }
                    </select>
                </>)}
                
                {this.state.type == "Health Insurance - HMO  " && (<>
                  <p>Town: </p>
                    <select className="dataDrop" onChange={this.SubmitsOption} style={{ width: '100%', marginBottom: '5%', padding: '5px' }}>
                    <option>Select State</option>
                    {
                        this.state.hospitalTown && 
                        hospitals.filter(allDict => allDict[1].trim() == this.state.hospitalTown).map(lg => {
                            return (
                                <option>{lg[0]}</option>
                            )
                        })
                    }
                    </select>
                </>)}
            </div>
			</div>
            <div className="but">
              <button 
                onSubmit={this.handleSubmit}
                type="submit" 
                className="submit">
                Submit
              </button>
            </div>
          </form>
          <hr className="border-left" />
          </div>
        </Modal.Body>
      </Modal>
        <div className="new">
            {Imagedatas}
        </div>
      </div>
    );
  }
}

export default withRouter(Insurance)
