from django.conf.urls import include, patterns, url
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^home/$', views.home, name='home'),
    url(r'^signup/$', views.signup, name="signup" ),
    url(r'^login/$', views.login, name="login" ),
    url(r'^register/success/$', views.register_success, name="register"),
    url(r'^login/success/$', views.main, name="main"),
    url(r'^logout/$', views.logout_page, name="logout"),

    url(r'^password/reset/$',
                auth_views.password_reset,
                name='password_reset'),
    url(r'^password/reset/done/$',
                auth_views.password_reset_done,
                name='password_reset_done'),
    url(r'^password/reset/complete/$',
                auth_views.password_reset_complete,
                name='password_reset_complete'),
    url(r'^password/reset/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$',
                auth_views.password_reset_confirm,
                name='password_reset_confirm'),
]
