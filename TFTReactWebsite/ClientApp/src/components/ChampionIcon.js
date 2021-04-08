import React, { Component } from 'react';
import styles from './ChampionIcon.module.css';

export class ChampionIcon extends Component {

    Border(tier) {
        switch (tier) {
            case 1:
                return { border: "4px solid #213042" };

            case 2:
                return { border: "4px solid #156831" };

            case 3:
                return { border: "4px solid #12407c" };

            case 4:
                return { border: "4px solid #893088" };

            case 5:
                return { border: "4px solid #b89d27" };
        }
        return { border: "4px solid black" };
    }

    render() {
        let champion = this.props.champion;
        let tierBorder = this.Border(champion.tier);
        return (
            <div className={styles.container}>
                <img className={styles.image} src={champion.image} alt={champion.name} style={tierBorder}></img>
                <span className={styles.title}>{champion.name}</span>
                <span className={styles.tier}>{champion.tier}</span>
                <div className={styles.traitContainer}>
                    {champion.traitImages.map((traitImage) => (
                        <img src={traitImage} className={styles.traitIcon}></img>
                    ))}
                </div>
            </div>
        );
    }
}
