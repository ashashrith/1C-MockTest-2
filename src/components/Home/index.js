import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseItem from '../CourseItem'
import './index.css'

class Home extends Component {
  state = {isLoading: true, failView: false, courseList: []}

  componentDidMount() {
    this.getCoursesDetails()
  }

  getCoursesDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        courseList: fetchedData,
        isLoading: false,
        failView: false,
      })
    }
    if (response.ok !== true) {
      this.setState({failView: true, isLoading: false})
    }
  }

  failBtn = () => {
    this.getCoursesDetails()
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

  render() {
    const {courseList, isLoading, failView} = this.state

    return (
      <div className="bg-container">
        <Header />
        <div className="container">
          {isLoading ? (
            this.renderLoader()
          ) : (
            <>
              {failView ? (
                this.renderFailView()
              ) : (
                <>
                  <h1 className="heading">Courses</h1>
                  <ul className="ul">
                    {courseList.map(each => (
                      <CourseItem
                        item={each}
                        key={each.id}
                        onClickItem={this.onClickItem}
                      />
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
}

export default Home
