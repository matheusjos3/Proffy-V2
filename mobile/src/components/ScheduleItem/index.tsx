import { View, Text, Image } from 'react-native';

import { convertMinutesToHoursInt } from '../../utils/ConvertMinutesToHours';

import arrowRight from '../../assets/icons/arrowRight.png'

import styles from './styles';

interface ScheduleProps {
    schedules: ScheduleItem[]
}

interface ScheduleItem {
    id: number,
    week_day: number;
    from: number;
    to: number;
}

export function ScheduleItem({ schedules }: ScheduleProps) {

    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={[styles.topText, { marginLeft: 24 }]}>Dia</Text>
                <Text style={[styles.topText, { marginRight: 32 }]}>horário</Text>
            </View>

            {
                days.map((day, index) => {
                    const available = schedules.find(
                        classes => classes.week_day === index
                    )

                    return (
                        <View style={[
                            styles.scheduleDay,
                            { opacity: available ? 1 : 0.4 }
                        ]}
                            key={index}
                        >
                            <Text style={[styles.scheduleDayText, { width: 70 }]}>{day}</Text>
                            <Image style={{ marginHorizontal: 20 }} source={arrowRight} />
                            <Text style={styles.scheduleDayText}>
                                {available ? `${convertMinutesToHoursInt(available.from)}h - ${convertMinutesToHoursInt(available.to)}h` : "-"}
                            </Text>
                        </View>
                    )
                })
            }

        </View>
    );
}