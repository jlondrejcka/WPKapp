from django.shortcuts import render
from registration.forms import *
from django.views.decorators.csrf import csrf_protect
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib import messages

# Create your views here.
@csrf_protect
def home(request):
    print("sdfasfdas")
    return render(request, 'home.html', {})

@csrf_protect
def signup(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)

        bRegister = request.POST.get('IsRegister', '')
        if bRegister == "LogIn":
            return login(request)

        if form.is_valid():
            user = User.objects.create_user(
            username=form.cleaned_data['username'],
            password=form.cleaned_data['password1'],
            email=form.cleaned_data['email']
            )
            return HttpResponseRedirect('/register/success/')
        else:
            messages.add_message(request,
                     messages.ERROR,
                     "Unable SignUp! "
                     "Check username/password")
    else:
        form = RegistrationForm()

    variables = RequestContext(request, {
    'form': form
    })

    return render(request, 'registration/signup.html')

@csrf_protect
def login(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        bRegister = request.POST.get('IsRegister', '')
        if bRegister == "Register":
            return signup(request)

        username = request.POST.get('username', '')
        password = request.POST.get('password1', '')
        user = auth.authenticate(username = username, password = password)
        if user is not None and user.is_active:
            # Correct password, and the user is marked "active"
            auth.login(request, user)
            # Redirect to a success page.
            print("bbbbbbbbbbbb")
            return HttpResponseRedirect("/register/loggedin/")
        else:
            # Show an error page
            print("sdfsdfsssss")
            messages.add_message(request, messages.INFO, "Unable login! " "Check username/password")
    else:
        form = LoginForm()
        print("aaaaaaaaaaaaaa")
        variables = RequestContext(request, {
        'form': form
        })

    return render(request, 'registration/login.html')

@csrf_protect
def register_success(request):
    return render(request, 'registration/success.html')

@csrf_protect
def logout_page(request):
    logout(request)
    return HttpResponseRedirect('/')
