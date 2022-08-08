import React from 'react'
import './SimpleIcon.css'
import {Link} from 'react-router-dom'

export default function SimpleIcon() {
    return (
        <div>
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />
            <section id="set-8">
                <div class="blurb-ripple-out-wrap hi-icon-effect-8 mt-4 links">
                    <i class="blurb-ripple-out fa  fa-twitter"><Link style={{ color: "black" }} to="http://twitter.com">twitter</Link></i>
                    <i class="blurb-ripple-out fa  fa-facebook"><Link style={{ color: "black" }} to="http://facebook.com">facebook</Link></i>
                    <i class="blurb-ripple-out fa  fa-google-plus"><Link style={{ color: "black" }} to="http://google.com">google</Link></i>
                    <i class="blurb-ripple-out fa  fa-github-alt"><Link style={{ color: "black" }} to="http://github.com">github</Link></i>
                    <i class="blurb-ripple-out fa  fa-dribbble"><Link style={{ color: "black" }} to="portfolio">sports</Link></i>
                    <i class="blurb-ripple-out fa  fa-skype"><Link style={{ color: "black" }} to="http://skype.com">skype</Link></i>
                </div>
            </section>
        </div>
    )
}
