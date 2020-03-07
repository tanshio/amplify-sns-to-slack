import axios from 'axios'

const PREFIX = `Your build status is`
const STATUSES = ['STARTED', 'SUCCEED', 'FAILED'] as const
type StatusType = typeof STATUSES[number]

type messageType = {
  [k in StatusType]: any
}

const createSlackMessage = (msg: string): any => {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: msg,
      },
    },
  ]
}

const slackMessages: messageType = {
  STARTED: `🚀 *デプロイが開始されました*`,
  SUCCEED: `🤩 *デプロイに成功しました*`,
  FAILED: `🤬 *デプロイに失敗しました*`,
}

export async function handler(event: any) {
  const message = event.Records[0]['Sns']['Message']
  const status =
    STATUSES.find((s) => {
      return `${PREFIX}${message}`.includes(s)
    }) || 'FAILED'

  await axios.post(process.env.SLACK_WEBHOOK_URL || '', {
    text: slackMessages[status],
    // Block Kit Builderを参考にする https://api.slack.com/tools/block-kit-builder
    blocks: createSlackMessage(slackMessages[status]),
  })

  return
}
