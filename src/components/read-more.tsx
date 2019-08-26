import React from 'react'
import { Link } from 'gatsby'

type Props = {
    title: string,
    link: string
  }

const ReadMore = ({ title, link }: Props) => (
    <Link to={link}>
        <div className="level">
            <div className="level-left">
                <div className="level-item">
                    <h4 className="ng-binding">Want to know more?</h4>
                    <h2 className="white ng-binding">Read Our Mission</h2>
                </div>
            </div>
            <div className="level-right">
                <div className="level-item">
                    <span> > </span>
                </div>
            </div>
        </div>
    </Link>
);

export default ReadMore;