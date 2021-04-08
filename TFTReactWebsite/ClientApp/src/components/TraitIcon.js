import React, { Component } from 'react';
import styles from './TraitIcon.module.css';
import { useSelector, useDispatch, connect } from "react-redux";

class TraitIcon extends Component {


    render() {
        console.log(this.props);
        let traitName = this.props.name;
        let medal = this.props.data.Medals;
        let trait = this.props.data.Traits.filter(x => x.name === traitName)[0];
        return (
            <div className={styles.container}>
                <span>{traitName}</span>
                <img style={{objectPosition: `-${53}px`}} className={styles.traitMedal} src={medal} alt="medal"></img>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
    }
};


const mapStateToProps = (state) => {
    return {
        data: {
            Medals: state.Trait.Medals,
            Traits: state.Trait.Traits
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TraitIcon);
