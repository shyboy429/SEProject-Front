<template>
    <div class="exam-header">
        <a-button type="primary" class="exam-preview" v-if="isPreview" @click="checkSubmit">交卷</a-button>
        <a-button type="primary" class="exam-preview" @click="isPreview = true" v-else>整卷预览</a-button>
        <a-button v-if="isPreview" class="back-preview" shape="round" @click="isPreview = false">
            <template #icon><icon-left /></template>
            返回
        </a-button>
        <p class="exam-title">考试</p>
    </div>
    <div class="exam-start">
        <div class="exam-info">
            <div class="common-style" style="position:sticky;top:0px">
                <div class="user-info">
                    <a-avatar shape="square" class="avatar" :src="userInfo.picture"></a-avatar>
                    <div class="desc">
                        <div>
                            <a-tag color="orange">{{ userInfo.nickname }}</a-tag>
                            <span class="real-name">({{ userInfo.realName ?? '未认证' }})</span>
                        </div>
                        <div>
                            <a-tag color="blue">{{ userInfo.schoolName ?? '未认证' }}</a-tag>
                            <a-tag color="blue">{{ userInfo.jobNo ?? '未认证' }}</a-tag>
                        </div>
                    </div>
                </div>
                <div class="number-desc">
                    <span class="number"> 已答：<a-tag color="green">{{ answerNumber }}</a-tag></span>
                    <span class="number"> 题数：<a-tag color="orangered">{{ questionList.length }}</a-tag></span>
                </div>
            </div>
            <div class="common-style">
                <a-countdown :value="dayjs(examInfo.endTime).valueOf()" :format="'HH:mm:ss'">
                    <template #title>
                        <h1>{{ examInfo.title ?? 'loading' }}</h1>
                    </template>
                </a-countdown>
                <a-tag class="exam-stat-time" style="margin:10px 0">开始时间：{{ examInfo.startTime }}</a-tag>
                <a-tag class="exam-end-time">结束时间：{{ examInfo.endTime }}</a-tag>
            </div>
            <div class="common-style">
                <div style="display:flex;align-items: center;">
                    <h5>标记区</h5>
                    <p style="margin-left: 10px;font-size:12px;color:var(--color-text-2)">答案不确定，点击题目序号进行标记</p>
                </div>
                <div>
                    <a-tag v-for="mark in markNumberList" :key="mark.id" @click="switchQuestion(mark.index)" color="magenta">{{ mark.index + 1 }}</a-tag>
                </div>
                <a-empty v-if="markNumberList.length === 0" description="暂无标记题目" />
            </div>
        </div>
        <div class="exam-list">
            <div>
                <div class="question-pre-next" style="display: flex; justify-content: space-around" v-if="!isPreview">
                    <a-button-group>
                        <a-button long :disabled="currQuestIndex == 0" @click="switchQuestion(currQuestIndex - 1)">上一题
                            <template #icon>
                                <icon-left />
                            </template>
                        </a-button>
                        <a-button class="nextquestBtn" long type="primary" :disabled="currQuestIndex == questionList.length - 1" @click="switchQuestion(currQuestIndex + 1)">
                            <template #icon>
                                <icon-right />
                            </template>
                            下一题
                        </a-button>
                    </a-button-group>
                </div>
                <a-spin dot :loading="loading" v-if="questionList.length != 0" style="width: 100%; min-height: 200px">
                    <a-list :data="getExamQuestion" :bordered="false">
                        <template #item="{ item, index }">
                            <a-list-item :id="`question-${item.id}`">
                                <div>
                                    <div v-if="item.type === '选择题'">
                                        <p>{{ index + 1 }}. {{ item.question }}</p>
                                        <a-radio-group v-model="item.selectedOption" @change="submitAnswer(item.id)">
                                            <a-radio v-for="option in item.options" :key="option.id" :value="option">{{ option.text }}</a-radio>
                                        </a-radio-group>
                                    </div>
                                    <div v-else-if="item.type === '判断题'">
                                        <p>{{ index + 1 }}. {{ item.question }}</p>
                                        <a-radio-group v-model="item.selectedOption" @change="submitAnswer(item.id)">
                                            <a-radio :value="true">正确</a-radio>
                                            <a-radio :value="false">错误</a-radio>
                                        </a-radio-group>
                                    </div>
                                </div>
                            </a-list-item>
                        </template>
                    </a-list>
                </a-spin>
                <a-empty v-else></a-empty>
            </div>
        </div>
        <div class="exam-number common-style">
            <div style="display:flex;align-items: center;">
                <h5>作答状态</h5>
            </div>
            <div>
                <a-tag v-for="(status, index) in answerStatus" :key="index" @click="switchQuestion(index)" :color="status.color">{{ index + 1 }}</a-tag>
            </div>
        </div>
    </div>
</template>
