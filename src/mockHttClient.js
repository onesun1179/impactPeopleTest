import moment from "moment"

const mockHttpClient = (() => {
    let contracts = [
        // 유지 상태의 계약
        {
            id: 1,
            userName: '홍길동',
            contractName: '자동차 보험',
            contractStatus: 1,
            contractDescription: '일반적인 자동차 보험입니다.',
            startAt: moment().subtract(1, 'days').toDate(),
            endAt: moment().subtract(1, 'days').toDate(),
        },
        // 변경된 계약
        {
            id: 2,
            userName: '김연아',
            contractName: '생명보험',
            contractStatus: 5,
            contractDescription: '당신의 생명을 지켜주는 생명보험 입니다.',
            startAt: moment().subtract(1, 'days').toDate(),
            endAt: moment().subtract(1, 'days').toDate(),
        },
        // 만료된 계약
        {
            id: 2,
            userName: '안철수',
            contractName: '자동차 보험',
            contractStatus: 1,
            contractDescription: '일반적인 자동차 보험입니다.',
            startAt: moment().subtract(3, 'years').toDate(),
            endAt: moment().subtract(2, 'years').toDate(),
        },
        // 해지된 계약
        {
            id: 2,
            userName: '스티브',
            contractName: '생명보험',
            contractStatus: 2,
            contractDescription: '생명보험입니다.',
            startAt: moment().subtract(14, 'days').toDate(),
            endAt: moment().add(1, 'years').toDate(),
        }
    ]

    return {
        getContracts({ startAt, endAt }) {
            return new Promise((resolve, reject) => {
                console.log(startAt, endAt)
                if (Math.random() < 0.7) {
                    return reject(new Error('Network is not stable...'))
                }

                if (startAt.constructor.name !== 'Date') {
                    return reject('startAt should be Date')
                } else if (endAt.constructor.name !== 'Date') {
                    return reject('endAt should be Date')
                }

                setTimeout(() => {
                    return resolve(contracts)
                }, 10)
            })
        },
        async deleteContract(id) {
            contracts = contracts.filter(v => v.id != id)
        },
        async updatContract(id, key, value) {
            contracts = contracts.map(v => {
                if (v[id] == id) {
                    v[key] = value
                }

                return v
            })
        }
    }
})()

export default mockHttpClient;