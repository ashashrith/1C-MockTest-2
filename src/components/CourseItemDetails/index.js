import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class CourseItemDetails extends Component {
  state = {itemDetails: {}, isLoading: true, failView: false}

  componentDidMount() {
    this.getItemDetails()
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader color="#1e293b" />
    </div>
  )

  renderFailView = () => (
    <div className="fail-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="fail-view"
        className="fail-img"
      />
      <h1 className="fail-head">Oops! Something Went Wrong</h1>
      <p className="fail-p">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="fail-btn" onClick={this.failBtn}>
        Retry
      </button>
    </div>
  )

  failBtn = () => {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const fetchedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        itemDetails: fetchedData,
        isLoading: false,
        failView: false,
      })
    }
    if (response.ok !== true) {
      this.setState({isLoading: false, failView: true})
    }
  }

  render() {
    const {isLoading, itemDetails, failView} = this.state
    console.log(itemDetails)

    return (
      <div className="item-cont">
        <Header />
        <div className="div">
          {isLoading ? (
            this.renderLoader()
          ) : (
            <>
              {failView ? (
                this.renderFailView()
              ) : (
                <div className="d">
                  <img
                    src={itemDetails.imageUrl}
                    alt="name"
                    className="image"
                  />
                  <div className="c">
                    <h1 className="n">{itemDetails.name}</h1>
                    <p className="des">{itemDetails.description}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
}

export default CourseItemDetails
