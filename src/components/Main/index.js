import React, {useState, useEffect} from "react";
import {Button, Row, Col, Layout, Input, Form, Card, Table, message} from "antd";

import Wrapper from "../Wrapper";

import {useGithubAPI} from "../../api";

import styled from "styled-components";

const CenteredCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15vh 10vh 0 10vh;
`;

const Main = () => {
    const extraProps = {
        labelCol: {span: 12},
        wrapperCol: {span: 12},
        colon: false
    }
    const {getRepoList, forkRepo} = useGithubAPI();

    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [repoList, setRepoList] = useState([]);
    const [isForking, setIsForking] = useState({});

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        hideOnSinglePage: false,
        showSizeChanger: false,
        position: ["bottomCenter"],
    });


    useEffect(() => {
        getRepoList()
            .then(({data}) => {
                setRepoList(data);
            }, error => {
                console.log(error)
            })
            .finally(() => setIsLoading(false))
    }, [])

    const columns = [
        {
            title: "Repo",
            dataIndex: "url",
            width: "85%",
            render: (text, record) => <a href={text} target="_blank">{record["full_name"]}</a>
        },
        {
            title: "",
            dataIndex: "fork_btn",
            width: "15%",
            render: (text, record, i) => {
                return <Button loading={isForking[`${i}`]} onClick={() => fork(record["full_name"], i)}>Fork🍴</Button>
            }
        }
    ];

    /**
     * When page is changed
     * @param pagination
     */
    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const fork = (repo_name, i) => {
        setIsForking(prevState => ({...prevState, [`${i}`]: true}))

        form
            .validateFields()
            .then(() => {
                const {access_token} = form.getFieldsValue(true)

                forkRepo(access_token, repo_name)
                    .then(resp => {
                        const {data} = resp;
                        message.success(data["message"]);
                    }, error => {
                        const {response: {data}} = error;
                        message.error(data["message"]);
                    })
                    .finally(() => setIsForking(prevState => ({...prevState, [`${i}`]: false})))
            })
            .catch(() => {
                message.error("Please paste access token!");
                setIsForking(prevState => ({...prevState, [`${i}`]: false}))
            })
    }

    return <Wrapper isLoaderEnabled={isLoading}>
        <Layout style={{minHeight: "100vh"}}>
            <Row>
                <CenteredCol span={24}>
                    <Card
                        style={{width: 1000}}
                        title="Fork 🍴"
                        headStyle={{display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px"}}
                    >
                        <Form form={form} labelAlign="left">
                            <Form.Item
                                {...extraProps}
                                label="Your GH account's Access Token"
                                name={"access_token"}
                                rules={[{
                                    required: true,
                                    message: "Enter Access Token"
                                }]}
                            >
                                <Input placeholder={"Paste your access token..."}/>
                            </Form.Item>
                        </Form>

                        <Table
                            rowKey={(r) => r.name}
                            loading={isLoading}
                            pagination={pagination}
                            columns={columns}
                            dataSource={repoList}
                            onChange={handleTableChange}
                        />
                    </Card>
                </CenteredCol>
            </Row>
        </Layout>
    </Wrapper>
}

export default Main;