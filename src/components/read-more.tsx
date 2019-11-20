import React from 'react'
import { Link } from 'gatsby'

import '../styles/read-more.scss' 
import { Locale } from '../pages';

type Props = {
    title: string,
    link: string
  } & Locale

const ReadMore = ({ title, link, locale }: Props) => (
    <Link to={(locale ? "/" + locale : "") + link}>
        <div className="level read-more section content">
            <div className="level-left">
                <div className="level-item">
                    <div>
                        <p className="title has-text-info is-size-6">Want to know more?</p>
                        <p className="title has-text-white is-size-4">{title}</p>
                    </div>
                    <div className="is-hidden-tablet">
                        <span className="arrow-mobile is-size-2 has-text-white"> ❯ </span>
                    </div>
                </div>
            </div>
            <div className="level-right is-hidden-mobile">
                <div className="level-item">
                    <span className="arrow is-size-1 has-text-white"> ❯ </span>
                </div>
            </div>
        </div>
    </Link>
);

export default ReadMore;