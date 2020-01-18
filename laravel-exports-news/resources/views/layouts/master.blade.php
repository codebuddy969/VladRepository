<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <script>window.Laravel = { csrfToken: '{{ csrf_token() }}'}</script>
        <title>Export News</title>

        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    </head>
    <body>
        <!-- <div class="bck"></div> -->
        @include('layouts.navigation')
        <div class="en-master-container">
            @yield('content')
        </div>
        @include('layouts.footer')

        <script src="{{ asset('js/scripts.js') }}"></script>
        <script src="{{ asset('js/plugins/slick.min-1-8-1.js') }}"></script>
        <script src="{{ asset('js/plugins/select2.min.js') }}"></script>
        <script src="{{ asset('js/plugins/jquery.fancybox.js') }}"></script>
    </body>
</html>