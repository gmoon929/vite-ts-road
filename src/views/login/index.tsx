import React, { useState } from "react";
import './index.less'
import { useNavigate } from 'react-router-dom';
import { Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, WechatOutlined, AlipayCircleOutlined, WeiboOutlined } from '@ant-design/icons';
import { login } from '@/api/login'
import logo from '@/assets/img/login/logo.png';
import logoText from '@/assets/img/login/logo-text.png'
const LogForm: React.FC = () => {
  const [loginType, setLoginType] = useState('1')
  const SelectLoginType: any = (type: string) =>{ 
    setLoginType(type)
  }


  const [user,setUser] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate();
  const LogOn = async() => {
    if(user && password){
      await login({user, password})
      navigate('/page/home');
    }else{
      message.warning({
        content: '用户名和密码不可为空！',
      });
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex justify-between parentBox">
        <div className="w-590px pt-128px pl-128px">
          <div>
            <div className="h-48px flex items-center mb-48px">
              <img className="w-48px h-48px mr-16px" src={logo} alt="logo" />
              <img className="h-48px mr-16px" src={logoText} alt="logotext" />
            </div>
            <div className="title-text mb-36px">路讯智控平台</div>
            <div className="min-title-text">以公路信息互联为基，全面赋能城市畅行新未来</div>
          </div>
        </div>
        <div className="w-1/4 min-w-450px h-screen flex justify-center loginBox">
            <div className="w-8/10 pt-128px">
              <div className="login-text mb-48px">登录</div>
              <div className="mb-32px relative h-56px flex items-center max-w-max">
                <div className="flex">
                  <div className={`mr-32px login-type ${loginType == '1' ? 'login-type-checked' : ''}`} onClick={() =>SelectLoginType('1')}>密码登录</div>
                  <div className={`login-type ${loginType == '2' ? 'login-type-checked' : ''}`} onClick={() =>SelectLoginType('2')}>快捷登录</div>
                </div>
                <div className={`checked-iconBox absolute ${loginType == '1' ? '' : 'checked-iconBox-checked'}`}></div>
              </div>
              <div className="mb-200px">
                <Input
                    size="large"
                    className="mb-16px h-48px"
                    value={user}
                    onChange={(e: any) => {setUser(e.target.value)}}
                    placeholder="账号"
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                  <Input.Password
                    size="large"
                    className="mb-48px h-48px"
                    value={password}
                    onChange={(e: any) => {setPassword(e.target.value)}}
                    placeholder="密码"
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                  <Button size="large" className="w-full h-48px mb-8px" type="primary" onClick={LogOn}>登录</Button>
                  <div className="flex justify-between tip-text themeColor">
                    <span>没有账户? 免费注册</span>
                    <span>忘记密码?</span>
                  </div>
              </div>
              <div className="w-full">
                <div className="quickly-text">快捷登录</div>
                <div className="quickly-icon-box">
                  <div className="quickly-icon">
                    <WechatOutlined className="text-24px" style={{color: '#07c160'}}/>
                    <AlipayCircleOutlined className="text-24px" style={{color: '#1976FF'}}/>
                    <WeiboOutlined className="text-24px" style={{color: '#E6162D'}}/>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default LogForm;
