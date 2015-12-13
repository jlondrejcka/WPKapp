from django.conf.urls import patterns, include, url
from django.contrib import admin
from registration.views import home, signup, login, logout_page, main, register_success
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'WPKapp.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', home, name='home'),
    url(r'^signup/$', signup, name="signup" ),
    url(r'^login/$', login, name="login" ),
    url(r'^login/success/$', main, name="main"),
    url(r'^register/success/$', register_success, name="register"),
    url(r'^logout/$', logout_page, name="logout"),
)
